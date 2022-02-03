export const getPagination = (page = 1) => {
    const take = 5;
    return {
        take,
        skip: (page - 1) * take,
    };
};

export const getCategories = (category = '') => {
    /*
        자세한 category에 관한 제약 사항이 없어서 다음과 같이 활용하겠습니다.
        Category는 강의에서 배운 Hashtags와 성격을 최대한 비슷하게 가진다. (hashtag컬럼 -> name)
        그러나 Hashtag처럼 #을 prefix로 가지지 않으며 입력받을 때 공백으로 구분하며 name에는 공백을 허용하지 않는다.
        Category의 slug 속성은 어떤 용도인지 알 수가 없으므로 선택적으로 입력을 받도록 한다. 
    */
    const categories = category.trim().split(' ') || [];
    return categories.map((category) => ({
        where: { name: category },
        create: { name: category },
    }));
};
