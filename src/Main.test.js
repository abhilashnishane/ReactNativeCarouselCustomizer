const Main = require("./Main")
// @ponicode
describe("onChangeText", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onChangeText("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onChangeText("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onChangeText("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.onChangeText(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("submitSearch", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.submitSearch({ nativeEvent: { text: "Hello, world!" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.submitSearch({ nativeEvent: { text: "Foo bar" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.submitSearch({ nativeEvent: { text: -1 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.submitSearch({ nativeEvent: { text: 10 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.submitSearch({ nativeEvent: { text: 0.0 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.submitSearch(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("dropOnCarousel", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.dropOnCarousel("ISO 22000")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.dropOnCarousel("AOP")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.dropOnCarousel("label_3")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.dropOnCarousel("ISO 9001")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.dropOnCarousel("label_1")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.dropOnCarousel(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("collectionItemLongPress", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.collectionItemLongPress("label_3", 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.collectionItemLongPress("label_2", -100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.collectionItemLongPress("label_1", 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.collectionItemLongPress("ISO 9001", 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.collectionItemLongPress("label_1", -100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.collectionItemLongPress("", -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("deleteCarouselItem", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.deleteCarouselItem("ISO 22000", 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.deleteCarouselItem("label_2", -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.deleteCarouselItem("AOP", 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.deleteCarouselItem("label_2", 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.deleteCarouselItem("label_2", -100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.deleteCarouselItem(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("gotoPrevPage", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.gotoPrevPage()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("gotoNextPage", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.gotoNextPage()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fetchPrevOrNextPage", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.fetchPrevOrNextPage(-1, 32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.fetchPrevOrNextPage(10, 64)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.fetchPrevOrNextPage("foo bar", 32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.fetchPrevOrNextPage("Foo bar", 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.fetchPrevOrNextPage(10, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.fetchPrevOrNextPage(NaN, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new Main.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
