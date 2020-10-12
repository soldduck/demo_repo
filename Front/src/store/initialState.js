
export const initialState = {
    token: "",
    user: {
        Name: "",
        Surname: "",
        Patronymic: "",
        ID: "",
        Status: "",
        Error: "",
    },
    searchParameters: {
        tab_1: "Автор",
        word_1: "",
        condAfter_1: "1",
        tab_2: "Заглавие",
        word_2: "",
        condAfter_2: "1",
        tab_3: "Ключевые слова",
        word_3: "",
        condAfter_3: "1",
        tab_4: "Дата издания",
        word_4: "",
    },
    searchedBooks: [],
    usersBooks:{
        usersGainedBooks: [],
        usersPreorderedBooks: [],
        usersOrderedBooks: []
    }
}
