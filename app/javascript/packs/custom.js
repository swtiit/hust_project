$(document).on("turbolinks:load",function(){
  setTimeout(function(){
    $('.alert').remove()
  }, 8000)

  $(document).on('change', '.upload-img', function(){
    if (input.files && input.files[0]) {
      var reader = new FileReader()

      reader.onload = function(e) {
        $('#img_prev').attr('src', e.target.result)
      }

      reader.readAsDataURL(input.files[0])
    }
  })

  const districts_demand = $('#demand_district_id').html()
  $(document).on('change', '#demand_province_id', function(){
    const province = $('#demand_province_id :selected').text()
    const options = $(districts_demand).filter('optgroup[label="' + province + '"]').html()

    if (options){
      $('#demand_district_id').html(options)
      $('#demand_district_id').parent().show()
    }
    else {
      $('#demand_district_id').empty()
    }
  })

  const districts_user = $('#user_teacher_attributes_district_id').html()
  $(document).on('change', '#user_teacher_attributes_province_id', function(){
    const province = $('#user_teacher_attributes_province_id :selected').text()
    const options = $(districts_user).filter('optgroup[label="' + province + '"]').html()

    if (options){
      $('#user_teacher_attributes_district_id').html(options)
      $('#user_teacher_attributes_district_id').parent().show()
    }
    else {
      $('#user_teacher_attributes_district_id').empty()
    }
  })

  $(document).on('click', 'tr[data-link]', function(){
    window.location = $(this).data('link')
  })

  $(document).on('change', '.role input', function(){

    if($('.role input:checked').val() == "teacher") {
      $('.form-teacher').css("display", "block")
    }
    else {
      $('.form-teacher').css("display", "none")
    }
  })
});
