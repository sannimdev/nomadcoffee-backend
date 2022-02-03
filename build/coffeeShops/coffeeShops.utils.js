"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagination = exports.getCategories = void 0;

var getPagination = function getPagination() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var take = 5;
  return {
    take: take,
    skip: (page - 1) * take
  };
};

exports.getPagination = getPagination;

var getCategories = function getCategories() {
  var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /*
      자세한 category에 관한 제약 사항이 없어서 다음과 같이 활용하겠습니다.
      Category는 강의에서 배운 Hashtags와 성격을 최대한 비슷하게 가진다. (hashtag컬럼 -> name)
      그러나 Hashtag처럼 #을 prefix로 가지지 않으며 입력받을 때 공백으로 구분하며 name에는 공백을 허용하지 않는다.
      Category의 slug 속성은 어떤 용도인지 알 수가 없으므로 선택적으로 입력을 받도록 한다. 
  */
  var categories = category.trim().split(' ') || [];
  return categories.map(function (category) {
    return {
      where: {
        name: category
      },
      create: {
        name: category
      }
    };
  });
};

exports.getCategories = getCategories;