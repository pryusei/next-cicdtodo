import  { expect, test } from "vitest";

function sum(a:number, b:number) {
    return a+ b;
}

test("足し算", () => {
    expect(sum(1,1)).toBe(2);
});