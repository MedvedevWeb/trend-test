'use strict';

// First Task

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Appartments = function () {
    function Appartments(min, max) {
      _classCallCheck(this, Appartments);

      this.min = min;
      this.max = max;
    }

    _createClass(Appartments, [{
      key: 'getAll',
      value: function getAll() {
        var arr = [];

        for (var num = this.min; num <= this.max; num++) {
          arr.push(num);
        }

        return arr;
      }
    }, {
      key: 'getReserved',
      value: function getReserved() {
        var n = this.min;
        var arrAll = this.getAll(),
            arr = [];

        while (n < this.max) {
          arr.push(n);
          n = n + Math.floor(5 * Math.random() + 1);
        }

        return arr;
      }
    }, {
      key: 'getData',
      value: function getData() {
        var obj = {
          all: this.getAll(),
          reserved: this.getReserved(),
          vacant: []
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = obj.all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var val = _step.value;

            if (obj.reserved.indexOf(val) === -1) {
              obj.vacant.push(val);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return obj;
      }
    }]);

    return Appartments;
  }();

  var appartments = new Appartments(20, 80).getData();

  var AppartmentsListItems = function (_React$Component) {
    _inherits(AppartmentsListItems, _React$Component);

    function AppartmentsListItems(props) {
      _classCallCheck(this, AppartmentsListItems);

      var _this = _possibleConstructorReturn(this, (AppartmentsListItems.__proto__ || Object.getPrototypeOf(AppartmentsListItems)).call(this));

      _this.appartments = props;
      return _this;
    }

    _createClass(AppartmentsListItems, [{
      key: 'render',
      value: function render() {
        var appartments = this.appartments;

        return appartments[this.props.type].map(function (id) {
          var contentClass = 'appartments_list-content' + (appartments.reserved.indexOf(id) !== -1 ? ' appartments_list-content__reserved' : '');

          return React.createElement(
            'li',
            { 'class': 'appartments_list-item' },
            React.createElement(
              'span',
              { 'class': contentClass },
              id
            )
          );
        });
      }
    }]);

    return AppartmentsListItems;
  }(React.Component);

  ReactDOM.render(React.createElement(AppartmentsListItems, _extends({ type: 'all' }, appartments)), document.getElementsByClassName('appartments_list__all')[0]);

  ReactDOM.render(React.createElement(AppartmentsListItems, _extends({ type: 'reserved' }, appartments)), document.getElementsByClassName('appartments_list__reserved')[0]);

  ReactDOM.render(React.createElement(AppartmentsListItems, _extends({ type: 'vacant' }, appartments)), document.getElementsByClassName('appartments_list__vacant')[0]);
})();

// Second Task
(function () {
  var AgencyFeesList = function (_React$Component2) {
    _inherits(AgencyFeesList, _React$Component2);

    function AgencyFeesList(props) {
      _classCallCheck(this, AgencyFeesList);

      var _this2 = _possibleConstructorReturn(this, (AgencyFeesList.__proto__ || Object.getPrototypeOf(AgencyFeesList)).call(this, props));

      _this2.state = { data: props.data, sort: null };
      _this2.handleSearch = _this2.handleSearch.bind(_this2);
      _this2.handleClick = _this2.handleClick.bind(_this2);
      return _this2;
    }

    _createClass(AgencyFeesList, [{
      key: 'handleSearch',
      value: function handleSearch(e) {
        var filteredData = this.props.data.filter(function (el) {
          var builderName = el.builderName.toLowerCase(),
              query = e.target.value.toLowerCase(),
              filteredBlocks = el.blocks.filter(function (block) {
            return block.blockName.toLowerCase().indexOf(query) !== -1;
          });

          return builderName.indexOf(query) !== -1 || filteredBlocks.length > 0;
        });

        this.setState({ data: filteredData, sort: null });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(e) {
        var newData = [],
            sortBy = this.state.sort === 'asc' ? 'desc' : 'asc';

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.state.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var el = _step2.value;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = el.blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var block = _step3.value;

                var obj = {
                  builderName: el.builderName,
                  builderAdverticement: el.builderAdverticement,
                  blocks: [block]
                };

                newData.push(obj);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        newData.sort(function (a, b) {
          a = a.blocks[0].blockPlanPercent.match(/(\d+.?\d*)%/)[1];
          b = b.blocks[0].blockPlanPercent.match(/(\d+.?\d*)%/)[1];

          return sortBy === 'asc' ? a - b : b - a;
        });

        this.setState({ data: newData, sort: sortBy });
      }
    }, {
      key: 'render',
      value: function render() {
        var sort = this.state.sort,
            handlerClass = 'agency-fees_table-cell agency-fees_table-cell__handler' + (sort ? ' agency-fees_table-cell__' + sort : '');

        return React.createElement(
          'div',
          { 'class': 'agency-fees_content' },
          React.createElement(
            'div',
            { 'class': 'agency-fees_input' },
            React.createElement('input', { type: 'text', placeholder: '\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430 \u0438\u043B\u0438 \u0416\u041A', 'class': 'agency-fees_input-field', onChange: this.handleSearch })
          ),
          React.createElement(
            'table',
            { 'class': 'agency-fees_table' },
            React.createElement(
              'thead',
              { 'class': 'agency-fees_table-head' },
              React.createElement(
                'tr',
                { 'class': 'agency-fees_table-row' },
                React.createElement(
                  'td',
                  { 'class': 'agency-fees_table-cell' },
                  '\u0417\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A'
                ),
                React.createElement(
                  'td',
                  { 'class': 'agency-fees_table-cell' },
                  '\u0416\u041A'
                ),
                React.createElement(
                  'td',
                  { 'class': handlerClass, onClick: this.handleClick },
                  React.createElement(
                    'span',
                    { 'class': 'agency-fees_table-cell-text' },
                    '\u041F\u043B\u0430\u043D'
                  )
                ),
                React.createElement(
                  'td',
                  { 'class': 'agency-fees_table-cell' },
                  '\u0420\u0435\u043A\u043B\u0430\u043C\u0430'
                )
              )
            ),
            React.createElement(
              'tbody',
              null,
              this.state.data.map(function (el) {
                return React.createElement(AgencyFeesListSubRow, { builderName: el.builderName, builderAdverticement: el.builderAdverticement, blocks: el.blocks });
              })
            )
          )
        );
      }
    }]);

    return AgencyFeesList;
  }(React.Component);

  var AgencyFeesListSubRow = function (_React$Component3) {
    _inherits(AgencyFeesListSubRow, _React$Component3);

    function AgencyFeesListSubRow() {
      _classCallCheck(this, AgencyFeesListSubRow);

      return _possibleConstructorReturn(this, (AgencyFeesListSubRow.__proto__ || Object.getPrototypeOf(AgencyFeesListSubRow)).apply(this, arguments));
    }

    _createClass(AgencyFeesListSubRow, [{
      key: 'render',
      value: function render() {
        var _this4 = this;

        var blocks = this.props.blocks;

        return blocks.map(function (block, i) {
          return React.createElement(
            'tr',
            { 'class': 'agency-fees_table-row' },
            i === 0 && React.createElement(
              'td',
              { 'class': 'agency-fees_table-cell agency-fees_table-cell__builder', rowspan: blocks.length },
              _this4.props.builderName
            ),
            React.createElement(
              'td',
              { 'class': 'agency-fees_table-cell agency-fees_table-cell__name' },
              block.blockName
            ),
            React.createElement(
              'td',
              { 'class': 'agency-fees_table-cell agency-fees_table-cell__plan' },
              block.blockPlanPercent
            ),
            i === 0 && React.createElement(
              'td',
              { 'class': 'agency-fees_table-cell agency-fees_table-cell__advert', rowspan: blocks.length },
              _this4.props.builderAdverticement
            )
          );
        });
      }
    }]);

    return AgencyFeesListSubRow;
  }(React.Component);

  fetch('../../model/data.json').then(function (res) {
    if (res.status === 200) return res.json();
  }).then(function (json) {
    ReactDOM.render(React.createElement(AgencyFeesList, json), document.getElementsByClassName('agency-fees_inner')[0]);
  });
})();