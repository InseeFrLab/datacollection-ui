export const chunkArray = (myArray, chunk_size) => {
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
};

export const fieldToTest = field => `${field}`.toLowerCase();

export const filterSurveys = (surveys, filterStr, surveysList) => {
    return surveys.filter(({ surveyUnitId, surveyWording }) => {
        return (
            (fieldToTest(surveyUnitId).includes(filterStr.toLowerCase()) ||
                fieldToTest(surveyWording).includes(filterStr.toLowerCase())) &&
            (surveysList.length > 0 ? surveysList.includes(surveyWording) : true)
        );
    });
};
