$(document).ready(function () {
    exibeProdutos(produtos)
    var carrinho =[];
    
    $('.buy').on('click', function() {
        var id = $(this).data('id');
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
    $(function () {
        $(".box_produtcs").slice(0, 3).show();
        $(".footer_btn").on('click', function (e) {
            e.preventDefault();
            $(".box_produtcs:hidden").slice(0, 3).slideDown();
            if($(".box_produtcs:hidden").length == 0) {
                $(".replace").text('NO CONTENT');
            }
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1500);
        });
        
    });
    

    $('.custom-select>select').change(function(){
        var ordenacao=$(this).val();
        var estoqueOrdenado=ordem(produtos,ordenacao)
        console.log(estoqueOrdenado)
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
            var preco = $('input[name=preco]').val();

            console.log(tamanhos);
            if(tamanhos.length>0){
                var estoqueFilter = filtraTamanho(tamanhos, produtos);
            }

            if(cores.length>0){
                var estoqueFilter = filtraCor(cores, produtos);
            }

            if(valor.length>0){
                 var estoqueFilter = filtraPreco(valor, produtos);
            }    
            console.log(estoqueFilter);
            

            
        })
        
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
        var qtdValores = valor.length;
        for(i=0; i < tamanhoEstoque; i++){ 
            for(j=0; j < qtdValores; j++){
                if(produtos[i].valor == valores[j]){
                    estoqueFiltrado.push(produtos[i]);
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
        var qtdProdutos=produtos.length
        for(i=0;i<qtdProdutos;i++){
            var valorFinal=produtos[i].valor/produtos[i].parcelas;
            $('.box_products').append(`<div class=\"single_product\"><img src=\"../imagens/${produtos[i].img}.png\" alt=\"\"><div class=\"info_product\"><h4>${produtos[i].nome}</h4><p><span><strong> R$ ${(produtos[i].valor).toFixed(2)}</strong></span></p><p> Até ${produtos[i].parcelas}x de R$${(valorFinal).toFixed(2)}</p><div data-id=\"${produtos[i].id}\" class=\"buy\"><a >Comprar</a></div></div></div>`)
        }
        
    }
    

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
    

 $('.botao-ordenar').on('click', function(){
    $('.order_sidebar').addClass('order_open');
    $('body').css('overflow-y','hidden');
    
    })
    
    $('.close_order_btn').on('click', function(){
    $('.order_sidebar').removeClass('order_open');
    $('body').css('overflow-y','scroll');
    })
    
   
     
    
   
})
