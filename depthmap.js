!function(t){var e={};function i(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="js/",i(i.s=0)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,i,a){return i&&t(e.prototype,i),a&&t(e,a),e}}(),n=r(i(1)),o=r(i(2));function r(t){return t&&t.__esModule?t:{default:t}}var s=new(r(i(3)).default.GyroNorm),l=function(){function t(container){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.container = container,this.canvas=document.createElement("canvas"),this.container.appendChild(this.canvas),this.gl=this.canvas.getContext("webgl"),this.ratio=window.devicePixelRatio,this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight,this.mouseX=0,this.mouseY=0,this.mouseTargetX=0,this.mouseTargetY=0, this.lastMouseMoveTime = Date.now(),this.mouseIdle = false,this.lockX = 0, this.lockY = 0,this.imageOriginal=this.container.getAttribute("data-imageOriginal"),this.imageDepth=this.container.getAttribute("data-imageDepth"),this.vth=this.container.getAttribute("data-verticalThreshold"),this.hth=this.container.getAttribute("data-horizontalThreshold"),this.imageURLs=[this.imageOriginal,this.imageDepth],this.textures=[],this.startTime=(new Date).getTime(),this.createScene(),this.addTexture(),this.mouseMove(),this.gyro()}return a(t,[{key:"addShader",value:function(t,e){var i=this.gl.createShader(e);if(this.gl.shaderSource(i,t),this.gl.compileShader(i),!this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS))throw new Error("Shader compile error: "+this.gl.getShaderInfoLog(i));this.gl.attachShader(this.program,i)}},{key:"resizeHandler",value:function(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight,this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.canvas.width=this.width*this.ratio,this.canvas.height=this.height*this.ratio,this.canvas.style.width=this.width+"px",this.canvas.style.height=this.height+"px";var t=void 0,e=void 0;this.height/this.width<this.imageAspect?(t=1,e=this.height/this.width/this.imageAspect):(t=this.width/this.height*this.imageAspect,e=1),this.uResolution.set(this.width,this.height,t,e),this.uRatio.set(1/this.ratio),this.uThreshold.set(this.hth,this.vth),this.gl.viewport(0,0,this.width*this.ratio,this.height*this.ratio)}},{key:"resize",value:function(){this.resizeHandler(),window.addEventListener("resize",this.resizeHandler.bind(this))}},{key:"createScene",value:function(){this.program=this.gl.createProgram(),this.addShader(o.default,this.gl.VERTEX_SHADER),this.addShader(n.default,this.gl.FRAGMENT_SHADER),this.gl.linkProgram(this.program),this.gl.useProgram(this.program),this.uResolution=new h("resolution","4f",this.program,this.gl),this.uMouse=new h("mouse","2f",this.program,this.gl),this.uTime=new h("time","1f",this.program,this.gl),this.uRatio=new h("pixelRatio","1f",this.program,this.gl),this.uThreshold=new h("threshold","2f",this.program,this.gl),this.billboard=new u(this.gl),this.positionLocation=this.gl.getAttribLocation(this.program,"a_position"),this.gl.enableVertexAttribArray(this.positionLocation),this.gl.vertexAttribPointer(this.positionLocation,2,this.gl.FLOAT,!1,0,0)}},{key:"addTexture",value:function(){this.gl;!function(t,e){for(var i=[],a=t.length,n=function(){0===--a&&e(i)},o=0;o<a;++o){var r=c(t[o],n);i.push(r)}}(this.imageURLs,this.start.bind(this))}},{key:"start",value:function(t){var e=this.gl;this.imageAspect=t[0].naturalHeight/t[0].naturalWidth,console.log(this.imageAspect,"=aspect",this);for(var i=0;i<t.length;i++){var a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t[i]),this.textures.push(a)}var n=this.gl.getUniformLocation(this.program,"image0"),o=this.gl.getUniformLocation(this.program,"image1");this.gl.uniform1i(n,0),this.gl.uniform1i(o,1),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[0]),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textures[1]),this.resize(),this.render()}},{key:"gyro",value:function(){var t=this;this.maxTilt=15;s.init({gravityNormalized:!0}).then(function(){s.start(function(e){var i=e.do.gamma,a=e.do.beta;t.mouseTargetY=m(a,-t.maxTilt,t.maxTilt)/t.maxTilt,t.mouseTargetX=-m(i,-t.maxTilt,t.maxTilt)/t.maxTilt})}).catch(function(t){console.log("not supported")})}},{key:"mouseMove",value:function(){var t=this;document.addEventListener("mousemove",function(e){var i=t.windowWidth/2,a=t.windowHeight/2;t.mouseTargetX = Math.max(-1, Math.min(1, (i - e.clientX) / i)),t.mouseTargetY = Math.max(-1, Math.min(1, (a - e.clientY) / a)),t.lastMouseMoveTime=Date.now(),t.mouseIdle=!1})}},{key:"render",value:function(){var t=((new Date).getTime()-this.startTime)/1e3;this.uTime.set(t);var e=Date.now();if(e-this.lastMouseMoveTime>2000){if(!this.mouseIdle){this.mouseIdle=!0,this.lockX=this.mouseTargetX,this.lockY=this.mouseTargetY}this.mouseTargetX=this.lockX,this.mouseTargetY=this.lockY}else this.mouseIdle=!1;this.mouseX+=.05*(this.mouseTargetX-this.mouseX),this.mouseY+=.05*(this.mouseTargetY-this.mouseY),this.uMouse.set(this.mouseX,this.mouseY),this.billboard.render(this.gl),requestAnimationFrame(this.render.bind(this))}}]),t}();function c(t,e){var i=new Image;  i.crossOrigin = "anonymous"; return i.src=t,i.onload=e,i}function h(t,e,i,a){this.name=t,this.suffix=e,this.gl=a,this.program=i,this.location=a.getUniformLocation(i,t)}function u(t){var e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,u.verts,t.STATIC_DRAW)}function m(t,e,i){return t==t&&(void 0!==i&&(t=t<=i?t:i),void 0!==e&&(t=t>=e?t:e)),t}e.default=l,h.prototype.set=function(){for(var t="uniform"+this.suffix,e=arguments.length,i=Array(e),a=0;a<e;a++)i[a]=arguments[a];var n=[this.location].concat(i);this.gl[t].apply(this.gl,n)},u.verts=new Float32Array([-1,-1,1,-1,-1,1,1,1]),u.prototype.render=function(t){t.drawArrays(t.TRIANGLE_STRIP,0,4)},document.querySelectorAll('.gl').forEach(container => {new l(container)})
