import {render} from "@testing-library/react";
import App from "../src/App";

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: false,
        statusText: 'Bad Request',
        json: () => Promise.resolve(),
    })
) as jest.Mock;

describe("Test", () => {
    it("render app", () => {
       render(<App />);
    });
});