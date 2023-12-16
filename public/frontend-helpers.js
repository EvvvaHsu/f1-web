console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

const data = [
  {
    id: 1,
    project_type: 'tv'
  },
  {
    id: 2,
    project_type: 'game'
  },
  {
    id: 3,
    project_type: 'film'
  },
  {
    id: 4,
    project_type: 'movie'
  }
]

selType()

function selType () {
  $('#project_type').select2({
    placeholder: 'Select project type',
    ajax: {
      type: 'POST',
      url: '/echo/json/',
      data: function (params) {
        const query = {
          message: params.term,
          data: data
        }
        return { json: JSON.stringify(query) }
      },
      processResults: function (data) {
        const grouped = groupBy(data.data, 'project_type')
        const data1 = []; let i = 0
        for (const k in grouped) {
          data1.push({ id: i++, text: k })
        }
        return {
          results: data1
        }
      }
    }
  })

  $('#project_type').on('select2:select', function (e) {
    const data = e.params.data
    const allData = $('#project_type').select2('data')
    const txt = []
    for (const k in allData) {
      txt.push(allData[k].text)
    }
    console.log('project_type sel', data, allData, txt)
  })
}

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
