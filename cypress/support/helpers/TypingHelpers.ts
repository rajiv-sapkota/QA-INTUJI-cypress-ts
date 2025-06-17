 

export class TypingHelpers {
    // Typing
    typeText(selector: string, text: string, clearBeforeTyping = true) {
        const input = cy.get(selector);
        if (clearBeforeTyping) input.clear();
        return input.type(text);
    }
}