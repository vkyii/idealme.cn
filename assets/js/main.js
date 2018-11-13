---
layout: null
---

$(function() {
  var toc     = $('.toc-link'),
      sidebar = $('#sidebar'),
      main    = $('#main'),
      menu    = $('#menu');
      
  var isMobile = navigator.userAgent.match(/(iPad|iPod|iPhone|Android)/i);
  
  var generateTOC = function() {
    var ptoc = $('#p-toc')
    ptoc.toggleClass('open');
    
    if(!isMobile){
      if(!ptoc.hasClass('open')) {
        ptoc.hide();
      }else {
        ptoc.show()
            .toc({
              title: '目录',
              listType: 'ul',
              showEffect: 'slideDown'
              });
              
        $('#p-toc .nav li > a[href^="#"]').on('click', function(e) {
            // prevent default anchor click behavior
            e.preventDefault();
            
            var target = $(this.hash);
            var container = $('main');
            container.animate({
              scrollTop: target.offset().top + container.scrollTop()
            });
        });
      }
    }
  }
  
  var toggleOpen = function() {
    $(this).add(sidebar).toggleClass('open');
    $(this).add(main).toggleClass('open');
    $(this).add(menu).toggleClass('open');
    generateTOC();
  };

  // run this function after pjax load.
  var afterPjax = function() {
    // code pretty
    $("pre").addClass("prettyprint linenums");
    prettyPrint();
    
    // open links in new tab.
    $('#main').find('a').filter(function() {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

    // discus comment.
    {% if site.disqus_shortname %}
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//{{ site.disqus_shortname }}' + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
    {% endif %}
    
    // duoshuo comment
    {% if site.duoshuo_short_name %}
    (function() {
      var dus=$(".ds-thread");
      if($(dus).length==1){
          var el = document.createElement('div');
          el.setAttribute('data-thread-key',$(dus).attr("data-thread-key"));//必选参数
          el.setAttribute('data-url',$(dus).attr("data-url"));
          DUOSHUO.EmbedThread(el);
          $(dus).html(el);
      }
    })();
    {% endif %}

    // your scripts
  };
  afterPjax();

  // NProgress
  NProgress.configure({ showSpinner: false });

  // Pjax
  $(document).pjax('#sidebar-avatar, .toc-link', '#main', {
    fragment: '#main',
    timeout: 3000
  });

  $(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
    },
    'pjax:end': function() {
      afterPjax();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn');
      menu.add(sidebar).removeClass('open');
      // {% if site.google_analytics %}
      // ga('set', 'location', window.location.href);
      // ga('send', 'pageview');
      // {% endif %}
    }
  });
  
  $(window).load(function() {
    toggleOpen();
  });
  
  $(document).keydown(function(event){ 
     switch(event.keyCode){
        case 38:
        case 40:
        // case 83:
        // case 87:
          toggleOpen();
          break;
        case 37:
        // case 65:
          // 上一篇
          if($("#goto_previous_page").length > 0){
            location.href = $("#goto_previous_page").attr("href"); 
          } 
          break;
        case 39:
        // case 68:
          // 下一篇
          if($("#goto_next_page").length > 0){
            location.href = $("#goto_next_page").attr("href");  
          }
          break;
      }
    });

  // Tags Filter
  $('#sidebar-tags').on('click', '.sidebar-tag', function() {
    var filter = $(this).data('filter');
    if (filter === 'all') {
      toc.fadeIn(350);
    } else {
      toc.hide();
      $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
    }
    $(this).addClass('active').siblings().removeClass('active');
  });


  // Menu
  menu.on('click', function() {
    toggleOpen();
  });
  
  $('#toggle_to_tag').on('click', function() {
    $('.sidebar-select-category').hide();
    $('.sidebar-select-tag').show();
  });

  $('#toggle_to_category').on('click', function() {
    $('.sidebar-select-category').show();
    $('.sidebar-select-tag').hide();
  });

});
