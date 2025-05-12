"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseMap = void 0;
function promiseMap(items, mapper, concurrency = Infinity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!items || !mapper) {
            throw new Error("items array and action must be defined");
        }
        if (items.length <= concurrency) {
            return Promise.all(items.map((item) => mapper(item)));
        }
        const inProgress = new Set();
        const results = [];
        for (const item of items) {
            if (inProgress.size >= concurrency) {
                yield Promise.race(inProgress);
            }
            const itemPromise = mapper(item);
            inProgress.add(itemPromise);
            results.push(itemPromise);
            itemPromise.finally(() => inProgress.delete(itemPromise));
        }
        return Promise.all(results);
    });
}
exports.promiseMap = promiseMap;
