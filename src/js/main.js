'use strict';

// First Task
(() => {
  class Appartments {
    constructor( min, max ) {
      this.min = min;
      this.max = max;
    }

    getAll() {
      const arr = [];

      for(let num = this.min; num <=   this.max; num++) {
        arr.push(num)
      }

      return arr;
    }

    getReserved() {
      let n = this.min;
      const arrAll = this.getAll(),
        arr = [];

      while(n < this.max) {
        arr.push(n);
        n = n + Math.floor(5 * Math.random() + 1);
      }

      return arr;
    }

    getData() {
      const obj = {
        all: this.getAll(),
        reserved: this.getReserved(),
        vacant: []
      };

      for(const val of obj.all) {
        if(obj.reserved.indexOf(val) === -1) {
          obj.vacant.push(val);
        }
      }

      return obj;
    }
  }

  const appartments = new Appartments(20, 80).getData();

  class AppartmentsListItems extends React.Component {
    constructor(props) {
      super();
      this.appartments = props;
    }

    render() {
      const appartments = this.appartments;

      return appartments[this.props.type].map((id) => {
        let contentClass = 'appartments_list-content' + (appartments.reserved.indexOf(id) !== -1 ? ' appartments_list-content__reserved' : '');

        return (
          <li class="appartments_list-item">
            <span class={ contentClass }>{ id }</span>
          </li>
        );
      });
    }
  }

  ReactDOM.render(
    <AppartmentsListItems type="all" {...appartments} />,
    document.getElementsByClassName('appartments_list__all')[0]
  );

  ReactDOM.render(
    <AppartmentsListItems type="reserved" {...appartments} />,
    document.getElementsByClassName('appartments_list__reserved')[0]
  );

  ReactDOM.render(
    <AppartmentsListItems type="vacant" {...appartments} />,
    document.getElementsByClassName('appartments_list__vacant')[0]
  );
})();


// Second Task
(() => {
  class AgencyFeesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: props.data, sort: null };
      this.handleSearch = this.handleSearch.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleSearch( e ) {
      const filteredData = this.props.data.filter(el => {
        const builderName = el.builderName.toLowerCase(),
          query = e.target.value.toLowerCase(),
          filteredBlocks = el.blocks.filter(block => {
            return block.blockName.toLowerCase().indexOf(query) !== -1;
          });

        return builderName.indexOf(query) !== -1 || filteredBlocks.length > 0;
      });

      this.setState({ data: filteredData, sort: null });
    }

    handleClick( e ) {
      const newData = [],
        sortBy = this.state.sort === 'asc' ? 'desc' : 'asc';

      for(const el of this.state.data) {
        for(const block of el.blocks) {
          const obj = {
            builderName: el.builderName,
            builderAdverticement: el.builderAdverticement,
            blocks: [ block ]
          };

          newData.push(obj);
        }
      }

      newData.sort((a, b) => {
        a = a.blocks[0].blockPlanPercent.match(/(\d+.?\d*)%/)[1];
        b = b.blocks[0].blockPlanPercent.match(/(\d+.?\d*)%/)[1];

        return sortBy === 'asc' ? a - b : b - a;
      });

      this.setState({ data: newData, sort: sortBy });
    }

    render() {
      const sort = this.state.sort,
        handlerClass = 'agency-fees_table-cell agency-fees_table-cell__handler' + (sort ? ` agency-fees_table-cell__${sort}` : '');

      return (
        <div class="agency-fees_content">
          <div class="agency-fees_input">
            <input type="text" placeholder="Начните вводить название застройщика или ЖК" class="agency-fees_input-field" onChange={this.handleSearch} />
          </div>
          <table class="agency-fees_table">
            <thead class="agency-fees_table-head">
              <tr class="agency-fees_table-row">
                <td class="agency-fees_table-cell">Застройщик</td>
                <td class="agency-fees_table-cell">ЖК</td>
                <td class={ handlerClass } onClick={ this.handleClick }><span class="agency-fees_table-cell-text">План</span></td>
                <td class="agency-fees_table-cell">Реклама</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(el => {
                  return <AgencyFeesListSubRow builderName={ el.builderName } builderAdverticement={ el.builderAdverticement } blocks={ el.blocks } />;
                })
              }
            </tbody>
          </table>
        </div>
      );
    }
  }

  class AgencyFeesListSubRow extends React.Component {
    render() {
      const blocks = this.props.blocks;

      return (
        blocks.map((block, i) => {
          return (
            <tr class="agency-fees_table-row">
              {
                i === 0 &&
                <td class="agency-fees_table-cell agency-fees_table-cell__builder" rowspan={ blocks.length }>{ this.props.builderName }</td>
              }
              <td class="agency-fees_table-cell agency-fees_table-cell__name">{ block.blockName }</td>
              <td class="agency-fees_table-cell agency-fees_table-cell__plan">{ block.blockPlanPercent }</td>
              {
                i === 0 &&
                <td class="agency-fees_table-cell agency-fees_table-cell__advert" rowspan={ blocks.length }>{ this.props.builderAdverticement }</td>
              }
            </tr>
          );
        })
      );
    }
  }

  fetch('../../model/data.json')
    .then(res => {
      if(res.status === 200) return res.json();
    })
    .then(json => {
      ReactDOM.render(
        <AgencyFeesList {...json} />,
        document.getElementsByClassName('agency-fees_inner')[0]
      );
    });
})();