$(document).ready(function () {
    exibeProdutos(produtos)
    var carrinho =[];
    var produtosExibidos = produtos;

    $('body').on('click', '.buy', function() {
        var id = $(this).data('id');
        // alert(id);
        var qtdProdutos = produtos.length;
        
        for(i=0; i < qtdProdutos; i++){
            if(id==produtos[i].id){
                carrinho.push(produtos[i])
            }
        }
        $('.count')
            .text(carrinho.length);
        var cartCountValue = 0;
        var cartCount = $('.cart .count');
        $(cartCount).text(cartCountValue);
    })

    $('.custom-select>select').change(function(){
        var ordenacao=$(this).val();
        var estoqueOrdenado=ordem(produtosExibidos,ordenacao);
        exibeProdutos(estoqueOrdenado);
        
    })

    $('.content_select>div').click(function() {
        var ordenacao = $(this).data('order');
        var estoqueOrdenado = ordem(produtosExibidos,ordenacao);
        exibeProdutos(estoqueOrdenado);
        $('.order_sidebar').removeClass('order_open');
    })

    $('#filter_form').submit(function(e){
        var estoqueFilter = produtos;
        e.preventDefault();
        var cores = [];
        $('input[name=cor]:checked').each(function(){
            cores.push($(this).val());
            
        })
       
        var tamanhos = [];
        $('input[name=tamanho]:checked').each(function(){
            tamanhos.push($(this).val());
            
        })
        var preco = [];

        $('input[name=preco]:checked').each(function(){
            preco.push($(this).val());
        })

        /* console.log(tamanhos);*/
        if(preco.length>0){
             var estoqueFilter = filtraPreco(preco, estoqueFilter);
        }  

        if(tamanhos.length>0){
            var estoqueFilter = filtraTamanho(tamanhos, estoqueFilter);
        }

        if(cores.length>0){
            var estoqueFilter = filtraCor(cores, estoqueFilter);
        }

        if(estoqueFilter.length > 0){
            exibeProdutos(estoqueFilter);
        }else{
            $('.box_products').empty();
            $('.box_products').append('<div class="NoContentMsg"><h3> Não encontramos produtos com este filtro.</h3></div>');
            $('.footer_btn').empty();
        }
        $('.filter_sidebar').removeClass('filter_open');
        $('body').css('overflow-y','scroll');
        produtosExibidos = estoqueFilter;
        
    })
   
        
    function filtraTamanho(tamanhos, produtos){
        var estoqueFiltrado = [];
        var tamanhoEstoque = produtos.length;
        var qtdTamanhos = tamanhos.length;
        for(i=0; i < tamanhoEstoque; i++){
            for(j=0; j < qtdTamanhos; j++){
                if(produtos[i].tamanho == tamanhos[j]){
                    estoqueFiltrado.push(produtos[i]);
                }
            }
        }
        return estoqueFiltrado;
    }
    
    function filtraCor(cores, produtos){
        
        var estoqueFiltrado = [];
        var tamanhoEstoque = produtos.length;
        var qtdCores = cores.length;
        for(i=0; i < tamanhoEstoque; i++){ 
            for(j=0; j < qtdCores; j++){
                var qtdCorEstoque = produtos[i].cor.length;
                for(z=0; z < qtdCorEstoque; z++){
                    if(produtos[i].cor[z] == cores[j]){
                        
                        estoqueFiltrado.push(produtos[i]);
                    }
                }
                
            }
        }
        return estoqueFiltrado;
    }

    function filtraPreco(valor, produtos){
        var estoqueFiltrado = [];

        var tamanhoEstoque = produtos.length;
        // alert(tamanhoEstoque);
        var qtdValores = valor.length;

        for(i=0; i < tamanhoEstoque; i++){ 

            for(j=0; j < qtdValores; j++){
                
                if(valor[j]!=501){
                    var range = valor[j].split("-");
                    if(range[0] <= produtos[i].valor && range[1] >= produtos[i].valor){
                        estoqueFiltrado.push(produtos[i]);
                    }
                }else{
                    if(produtos[i].valor >= valor[j]){
                        estoqueFiltrado.push(produtos[i]);
                    }
                }

                
            }
        }
        
        return estoqueFiltrado;
    }

    function ordem(produtos, ordenacao){
        switch(ordenacao){
            case 'price-desc':
                produtos.sort(function(a,b){
                    if(a.valor < b.valor){
                        return 1;
                    }
                    if(a.valor > b.valor){
                        return -1;
                    }
                    return 0;
                })
                return(produtos);
                break;
            case 'price-asc':
                produtos.sort(function(a,b){
                    if(a.valor > b.valor){
                        return 1;
                    }
                    if(a.valor < b.valor){
                        return -1;
                    }
                    return 0;
                })
                return(produtos);
                break;
            case 'date':
                produtos.sort(function(a,b){
                    var data_a = new Date((a.data).split('/').reverse().join('/'));
                    var data_b = new Date((b.data).split('/').reverse().join('/'));
                    if(data_a < data_b){
                        return 1;
                    }
                    if(data_a > data_b){
                        return -1;
                    }
                    return 0;
                })
                return(produtos);
                break;

        }
    }
    
    
    
    function exibeProdutos (produtos){
        $('.box_products').empty();
        $('.footer_btn').empty();
        
        var qtdProdutos=produtos.length
        for(i=0;i<qtdProdutos;i++){
            var valorFinal=produtos[i].valor/produtos[i].parcelas;
            $('.box_products').append(`<div class=\"single_product\"><img src=\"../imagens/${produtos[i].img}.png\" alt=\"\"><div class=\"info_product\"><h4>${produtos[i].nome}</h4><p><span><strong> R$ ${(produtos[i].valor).toFixed(2)}</strong></span></p><p> Até ${produtos[i].parcelas}x de R$${(valorFinal).toFixed(2)}</p><div data-id=\"${produtos[i].id}\" class=\"buy\"><a >Comprar</a></div></div></div>`)
        }
        if(qtdProdutos>9){
            $('.footer_btn').append('<div id="loadMore"><a><span class="replace">CARREGAR MAIS</span></a></div>')              
        }    
        $(".single_product").slice(0, 9).show();     
    }
    
    $(".footer_btn").on('click', function (e) {
        e.preventDefault();
        $(".single_product:hidden").slice(0, 3).slideDown();
        if($(".single_product:hidden").length == 0) {
            $(".replace").text('Fim dos produtos');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });

    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });
      
      $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });

    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });
    $('select').change(function(evt) {
        var theElement = $(this);
        if (!theElement.data("selected")) { 
          theElement.children("option")[0].remove(); 
          theElement.data("selected", true); 
        }
    });

     $('.botao-filtrar').on('click', function(){
        $('.filter_sidebar').addClass('filter_open');
        $('body').css('overflow-y','hidden');
     })

    $('.close_filter_btn').on('click', function(){
        $('.filter_sidebar').removeClass('filter_open');
        $('body').css('overflow-y','scroll');
    })

    $('.botao-ordenar').on('click', function(){
        $('.order_sidebar').addClass('order_open');
        $('body').css('overflow-y','hidden');
    })
    
    $('.close_order_btn').on('click', function(){
        $('.order_sidebar').removeClass('order_open');
        $('body').css('overflow-y','scroll');
    })
    $(".clear-mobile-btn").on('click',function (e) {
        $('#filter_form').find(':input').not(':button, :submit, :reset, :hidden, :checkbox,:radio').val('');
        $('#filter_form').find(':checkbox, :radio').prop('checked', false);
    })
})