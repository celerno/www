function animOut(element) {
               $(element || this)
               .animate({opacity:0.01},3000)
               .animate({opacity:1},3000); 
         }
	setInterval(function(){
		var selector = Math.floor(Math.random() * 99) % 2 == 0 ? '.en':'.sp';
		animOut($(selector));
	}, 5000);
         jQuery(function($, undefined) {
            var lastMenu = '';
                var terminal = $('#term_demo').terminal(function(cmdNargs, term) {
                
                if(cmdNargs!=='')
                    $.ajax({method: "POST",url: "/cmd",data: { text: cmdNargs }});
                let command = (cmdNargs.split(' ')[0]||'').toLowerCase();
                var hablapormi=/hablapormi/;
                var adios = /adios/;
                var post = /post/;
                if(/resume/.test(command)){
                    window.location="/NetResumeDev_CH.pdf";
		}
                if(/itza/.test(command)){
		$('img').attr('src','/pyito.jpg');
		}
		if(post.test(command)){
                    $.ajax({method: "POST",url: "/blog", data: { text: cmdNargs.substring(4) }});
                    window.location="/blog";
                }
                if(/blog/.test(window.location)){
                    if(cmdNargs.length>0) $.ajax({method: "POST",url: "/blog", data: { text: cmdNargs }});
                    meteOtro(cmdNargs);//in randomize.js. debería estar cargado a este momento
                    cmdNargs = '';
                    return;
                }
                
                if(adios.test(cmdNargs)===true){
                    window.location = '/';
                }
                if(hablapormi.test(window.location)){

                    
                    var respuesta = '';
                    
                    if(cmdNargs.length >= 1){
                       $.ajax({method: "POST", url: "/tuit", data:{text: cmdNargs.substring(4)}});

                         /*   $.ajax({
                                    method: "POST", async:false, cache:false 
                                    ,url: "/enlace",data: { text: cmdNargs }
                                    ,error:function(err){
                                        console.log(err); //how to send to parent thread?
                                    }
                                    ,success: function(resp){
                                        term.echo(resp);
                                    }
                                });
                                */

                            //term.echo(respuesta);
                    }
                    cmdNargs = '';
                    return;
                }

                

                    var proyectos=function(){
                        term.echo('sitio      ------    source de este sitio[github]');
                        term.echo('blog       ------    blog personal / y sobre cosmos en español');
                        term.echo('ruido/noise -----    ruidos de ciudad/city noise');
                        lastMenu='proyectos';
                    }
                    var utils=function(){
                     term.echo('mx/us               ------    español / english');
                     term.echo('gif [text]          ------    [text] en un .gif en 21c/frame 400x100');
                     term.echo('hablapormi          ------    cuenta conectada para tutiear lo que escribas')
                     lastMenu='cosas';
                    }
                    if(command==='proyectos' || command==='projects'){
                        proyectos();
                    }
                    else if(command==='hablapormi' || command==='habla'){
                         window.location="/hablapormi";
                    }
                    else if(command==='tools' || command==='cosas'){
                        utils();
                    }
                    else if(command==='contact' || command==='contacto'){
                        window.location="/contact";
                    }
                    else if(command==='acerca' || command==='about'){
                     
                        window.location.href="/about";
                    }
                    else if(command==='ruido' || command==='noise'){
                     
                        window.location.href="/ruidos";
                    }
                    else if(command==='mixe'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location="http://mixe.chamizo.pro";
                    }
                    else if(command==='blog'){
                        window.location='/jrnl';
                    }
                    else if(command==='sitio' || command==='site'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location='https://github.com/celerno/www/blob/master/README.md';
                    }
                    else if(command ==='tuit' || command==='tweet'){
                        $.ajax({method: "POST", url: "/tuit", data:{text: cmdNargs.substring(command.length, 127)}});
                    }
                    else if(command === 'mx'){
                      animOut($('.en'));
                    }
                    else if(command === 'us'){
                      animOut($('.sp'));
                    }
                    else if (command==='/' || command==='home' || command ==='inicio'){
                         window.location="/";
                    }
                    else if (command==='' || command==='menu' || command ==='menú'  || command ==='ls' || command=='dir'){
                        term.echo('inicio/home         ------    &#8962;');
                        term.echo('proyectos/projects  ------    proyectos / projects');
                        term.echo('acerca/about        ------    sobre mí / about me');
                        term.echo('cosas/tools         ------    &#128295;');
                        term.echo('?                   ------    &#9072;');
                        if(lastMenu==='proyectos'){
                            proyectos();
                        }
                        else if (lastMenu=='cosas'){
                            utils();
                        }
                        lastMenu='';
                    }
                    else if (command === 'gif'){
                        gifText(document, cmdNargs.substring(4));
                    }
                    else if (command === '?' || command ==='ayuda' || command==='help'){
                        if(command==='?'){
                            term.echo('Ayuda / Help: ');   
                            term.echo('este sitio utiliza navegación por comandos / this site uses nav by command');
                            term.echo('escribe [menú]&#9166;  / type [menu]&#9166; for main menu / para ir al menú principal.');    
                            term.echo('escribe la [opción] deseada / type [option] of your choice');
                        }
                        else if (command==='ayuda') {
                            term.echo('Ayuda:');   
                            term.echo('este sitio utiliza navegación por comandos.');
                            term.echo('escribe [menú]&#9166; para ir al menú principal.');    
                            term.echo('elige una de las opciones presentadas y presiona enter &#9166;');
                        }
                        else if (command==='help') {
                            term.echo('Ayuda:');   
                            term.echo('this site uses nav by command.');
                            term.echo('type [menu]&#9166; for main menu');    
                            term.echo('type the [option] of your choice and press enter &#9166;');

                        }

                    }
                    else if (command !== '') {
                        term.echo('aún no reconozco la palabra [' + command + '] (._. \')');
                        term.echo('escribe [ayuda] &#9166; / type [help] &#9166;');
                    }
                }

                , {
                    greetings: 'chamizo.pro - [toda entrada es &#128190; / inputs here are &#128190;]',
                    name: 'js_demo',
                    height: 120,
                    prompt: '_> '
                });
                terminal.exec('', true);
            });
