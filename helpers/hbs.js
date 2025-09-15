const moment = require('moment')
const { findByIdAndDelete } = require('../models/Tech')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"$&'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },
    truncateArray: function (arr) {
        return arr.slice().reverse().slice(0, 3)
    },
    reverseArray: function(arr) {
        return arr.slice().reverse()
    },
    getLastElement: function(arr) {
        return arr.slice(-1)
    },
}