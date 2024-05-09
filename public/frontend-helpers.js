// alert('hey')

$('#project_type').select2({ width: '100%', placeholder: 'Select an Option', allowClear: true })

selType()

function selType () {
  // alert('hey in frontend-helpers.js')

  $('#project_type').select2({
    width: '100%',
    placeholder: 'Select an Option',
    allowClear: true,
    ajax: {
      url: '/api/allCategories',
      dataType: 'json',
      delay: 250, // delay in milliseconds before the request is sent
      processResults: function (data) {
        return {
          results: data.data.map(function (item) {
            return {
              id: item.id,
              text: item.name // Assuming the category name is stored in a field called 'category_name'
            }
          })
        }
      },
      cache: true
    }
  })
}

// more button
document.querySelectorAll('.more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.product
    window.location.href = `/cateprod/${id}`
  })
})
