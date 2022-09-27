static JSONparse(text) {
        var rawObject = JSON.parse(text);
        var result = null;

        switch (rawObject.type) {
            case "book":
                result = new Book();
                break;
            case "CD":
                result = new CD();
                break;
            case "DVD":
                result = new DVD();
                break;
            case "Magazine":
                result = new Magazine();
                break;
        }

        Object.assign(result, rawObject);
        return result;
    }