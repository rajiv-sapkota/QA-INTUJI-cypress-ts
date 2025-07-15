 

export class TypingHelpers {
    
    //  to type text in an input field
    typeText(selector: string, text: string, clearBeforeTyping = true) {
        const input = cy.get(selector);
        if (clearBeforeTyping) input.clear();
        return input.type(text);
    }
}