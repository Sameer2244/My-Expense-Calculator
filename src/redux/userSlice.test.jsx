import { describe, expect, it } from "vitest";
import userSlice, { changeIncome } from "./userSlice";

describe("userReducer", () => {
    it("should add income", () => {

        //initial state
        const initialState = {
            name: "sameer",
            email: "demo@gmail.com",
            numberOfTransactions: 0,   
            income: 0,
            isloggedin: false
        };

        //adding income
        const action = changeIncome(10)
        
        //updating state
        const updatedState= userSlice(initialState, action);

        //checking if updated state is correct or not
        expect(updatedState.income).toEqual(10);
    })

})