(window["webpackJsonpcambio-score-board"]=window["webpackJsonpcambio-score-board"]||[]).push([[0],{10:function(e,t,a){e.exports=a(17)},15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(7),o=a.n(c),l=a(9),s=a(8),u=a(1),i=a(2),p=a(4),d=a(3),m=a(5),y=(a(15),function(e){function t(){var e,a;Object(u.a)(this,t);for(var r=arguments.length,n=new Array(r),c=0;c<r;c++)n[c]=arguments[c];return(a=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(n)))).handleSubmit=function(e){e.preventDefault();var t=a.props.player.id,r=e.target.score.value;a.props.addRoundToPlayer(t,r)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"renderRounds",value:function(){var e=this.props.player.rounds;return e.map((function(t,a){return n.a.createElement("div",{key:a,className:"score-card"},n.a.createElement("p",{className:"score"},t),n.a.createElement("p",{className:"player-total"},"Round ",e.length-a))}))}},{key:"render",value:function(){var e=this.props.player,t=e.name,a=e.total,r=e.img_url;return n.a.createElement("div",{className:"player-card"},n.a.createElement("div",{className:"profile"},n.a.createElement("img",{src:r,alt:""}),n.a.createElement("p",{className:"player-name"},t)),n.a.createElement("div",{className:"score-card total"},n.a.createElement("p",{style:{fontSize:"50px"},className:"score"},a),n.a.createElement("p",{className:"player-total"},"Total")),n.a.createElement("div",{className:"rounds"},this.renderRounds()),n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("input",{name:"score",type:"number",placeholder:"score"}),n.a.createElement("button",{type:"submit"},"Add Score")))}}]),t}(r.Component)),b={display:"flex",flexDirection:"column"},f=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{style:b,className:"player-list"},this.props.players.map((function(t){return n.a.createElement(y,{key:t.id,addRoundToPlayer:e.props.addRoundToPlayer,player:t})})))}}]),t}(r.Component),h=(a(16),function(e){function t(){var e,a;Object(u.a)(this,t);for(var r=arguments.length,n=new Array(r),c=0;c<r;c++)n[c]=arguments[c];return(a=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(n)))).state={input:""},a.handleInputChange=function(e){a.setState({input:e.target.value})},a.handleSubmit=function(e){e.preventDefault();var t={id:Math.random(),name:a.state.input,rounds:[],total:0,img_url:"https://shreckhiseshrubbery.com/wp-content/uploads/2018/01/placeholder-pic.png"};a.props.addPlayer(t)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"score-board-menu"},n.a.createElement("form",{onSubmit:this.handleSubmit,className:"new-player-form"},n.a.createElement("input",{onChange:this.handleInputChange,value:this.state.input,name:"newPlayer",type:"text",placeholder:"player name"}),n.a.createElement("button",{className:"btn",type:"submit"},"Add Player")))}}]),t}(r.Component));function O(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}var v=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).addRoundToPlayer=function(e,t){var r=a.state.players.map((function(a){if(a.id===e){var r=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?O(a,!0).forEach((function(t){Object(s.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):O(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a);return r.rounds.unshift(t||0),r.total=r.rounds.reduce((function(e,t){return parseInt(e)+parseInt(t)})),r}return a}));a.setState({players:r})},a.addPlayer=function(e){a.setState({players:[].concat(Object(l.a)(a.state.players),[e])})},a.state={players:[]},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(f,{players:this.state.players,addRoundToPlayer:this.addRoundToPlayer}),n.a.createElement(h,{addPlayer:this.addPlayer}))}}]),t}(n.a.Component);o.a.render(n.a.createElement(v,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.66c8e889.chunk.js.map