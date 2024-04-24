const { formatMovieToSend, formatShowToSend, formatTheatreToSend} = require("../utils/databaseUtils.js")

describe('database utils', () => {
    describe('format movie to send', () => {

        test("when passed no values", ()=>{

            const result = formatMovieToSend();
            expect(result).toEqual({});
        })

        test("when passed non existent properties", ()=>{
            
            const result = formatMovieToSend({
                xyz:"something"
            });
            expect(result).toEqual({});
        })

        test("when passed existent properties", ()=>{
            
            const result = formatMovieToSend({
                name:"Movie"
            });
            expect(result).toEqual({
                name:"Movie"
            });
        })

        test("when passed existent and non existent properties", ()=>{
            
            const result = formatMovieToSend({
                name:"Movie",
                xyz:"Something"
            });
            expect(result).toEqual({
                name:"Movie"
            });
        })

        test("when passed array", ()=>{
            
            const result = formatMovieToSend([]);
            expect(result).toEqual({});
        })

        test("when passed number", ()=>{
            
            const result = formatMovieToSend(10);
            expect(result).toEqual({});
        })

        test("when passed string", ()=>{
            
            const result = formatMovieToSend("something");
            expect(result).toEqual({});
        })

        test("when passed null", ()=>{
            
            const result = formatMovieToSend(null);
            expect(result).toEqual({});
        })
        
    })

    describe('format theatre to send', () => {

        test("when passed no values", ()=>{

            const result = formatTheatreToSend();
            expect(result).toEqual({});
        })

        test("when passed non existent properties", ()=>{
            
            const result = formatTheatreToSend({
                xyz:"something"
            });
            expect(result).toEqual({});
        })

        test("when passed existent properties", ()=>{
            
            const result = formatTheatreToSend({
                name:"Theatre"
            });
            expect(result).toEqual({
                name:"Theatre"
            });
        })

        test("when passed existent and non existent properties", ()=>{
            
            const result = formatTheatreToSend({
                name:"Theatre",
                xyz:"Something"
            });
            expect(result).toEqual({
                name:"Theatre"
            });
        })

        test("when passed array", ()=>{
            
            const result = formatTheatreToSend([]);
            expect(result).toEqual({});
        })

        test("when passed number", ()=>{
            
            const result = formatTheatreToSend(10);
            expect(result).toEqual({});
        })

        test("when passed string", ()=>{
            
            const result = formatTheatreToSend("something");
            expect(result).toEqual({});
        })

        test("when passed null", ()=>{
            
            const result = formatTheatreToSend(null);
            expect(result).toEqual({});
        })
        
    })

    describe('format show to send', () => {

        test("when passed no values", ()=>{

            const result = formatShowToSend();
            expect(result).toEqual({});
        })

        test("when passed non existent properties", ()=>{
            
            const result = formatShowToSend({
                xyz:"something"
            });
            expect(result).toEqual({});
        })

        test("when passed existent properties", ()=>{
            
            const result = formatShowToSend({
                totalSeats:4
            });
            expect(result).toEqual({
                totalSeats:4
            });
        })

        test("when passed existent and non existent properties", ()=>{
            
            const result = formatShowToSend({
                totalSeats:4,
                xyz:"Something"
            });
            expect(result).toEqual({
                totalSeats:4
            });
        })

        test("when passed array", ()=>{
            
            const result = formatShowToSend([]);
            expect(result).toEqual({});
        })

        test("when passed number", ()=>{
            
            const result = formatShowToSend(10);
            expect(result).toEqual({});
        })

        test("when passed string", ()=>{
            
            const result = formatShowToSend("something");
            expect(result).toEqual({});
        })

        test("when passed null", ()=>{
            
            const result = formatShowToSend(null);
            expect(result).toEqual({});
        })
        
    })
})