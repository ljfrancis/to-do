/*
To Do app.js
Lydia Francis
July 2017

Browser app for creating a to-do list
*/


//html for new row 
function createLi(text) {
  var $li = $('<li class="row"><div class="boxes">\
              <div class="item">\
              <input type="checkbox">\
              <label>Sample Item</label>\
              </div><div class="pencil button">\
              <span class="lnr lnr-pencil"></span><span class="edit tool-tip">Edit</span>\
              </div></div></li>');
  
  //gets unique id/for pair for checkbox
  const id = Math.random().toString();
  $li.find('input').attr("id", id);
  $li.find('label').attr("for", id);
  
  return $li;
}

function appendLi(text, $li) {
  $('form').parent().before($li);
  $('label').last().text(text);
  $checkbox = $('[type="checkbox"]');
}


//prevents submitted edited items
$('*').submit( function(event) {
  event.preventDefault();
});


//add new item to list
$('.new-item').submit(function(event) {
  event.preventDefault();
  const text = $('form input').val();
  if (text != ''){
    appendLi(text, createLi(text));
    if($('li').length < 12) {
      $('form input').val('');
    } else {
      $('form input').remove();
      const $tooMuch = $('<li>You need to clean up your life.<li>')
      $tooMuch.attr('id', 'too-much');
      $('li').last().before($tooMuch);
      } 
    }
});


//Checkbox toggle 
let $checkbox = $('[type="checkbox"]');

$('ul').click( function(event) {
  if (event.target.checked) {
    $(event.target).next().css('text-decoration', 'line-through');
  } else {
    $(event.target).next().css('text-decoration', 'none');
  }
});



//edit an item
$(document).on('click', '.lnr-pencil', function(event) {
  event.preventDefault();
  console.log($(event.target));
  let $label = $(event.target).parent().prev().find('label');
  $toolTip = $(event.target).next();
  //open edit view
  if ($toolTip.text() == 'Edit') {
    let text = $label.text();
    let $editLi = $('<form class="edit-item"><input type="text"></form>');
    $editLi.find('input').val(text);
    $label.text('');
    $label.css('padding', 0);
    $label.append($editLi);
    $('.edit.tool-tip').text('Save');
  } //save changes 
    else {
    let $editLi = $('.edit-item');
    const newText = $('.edit-item input').val();
    $editLi.remove();
    $label.text(newText);
    $label.css('padding-left', '35px');
    $('.edit.tool-tip').text('Edit');
  }
   
});



//remove all complete tasks
$('.trash').click( function(event) {
  event.preventDefault();
  let $list = $('#ul-list');
  let items = $('.row');
  for(var i=0; i < items.length; i++){
    let $label = $(items[i]).find('label');
    if ($label.css('text-decoration').includes('line-through')){
      $(items[i]).remove();
    }
  }
});



