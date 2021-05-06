window.onload = function() {
  const spinner = document.getElementById('loading');
  sleep(500, function(){
    spinner.classList.add('loaded');
      
  })
}

function sleep(ms, func) {
  setTimeout(func, ms);
}
