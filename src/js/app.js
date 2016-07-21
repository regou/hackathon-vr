import 'aframe';
import 'aframe-video-shader'
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import 'aframe-text-component';
import 'aframe-draw-component';
import 'aframe-htmltexture-component';

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';
import Plan from './components/YearPlan';

var testData =  require('./test_data_1000_less.json');
testData = testData.slice(0,5).reverse();

const POPUP_WIDTH = 3;
const POPUP_HEIGHT = 3;

class BoilerplateScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allExpand: false
		};
		this.clickType = AFRAME.utils.isMobile() ? 'click':'dblclick';
	}

	expand() {
		this.setState({
			allExpand: !this.state.allExpand
		});
	};


	componentDidMount(){
		document.addEventListener(this.clickType,this.expand.bind(this), this);
	}
	componentWillUnmount(){
		document.removeEventListener(this.clickType,this.expand.bind(this), this);
	}
	updatePopup(info, pos) {
		var popupBG = document.querySelector('#popup-bg');
		popupBG.setAttribute('geometry', { primitive: 'plane', width: POPUP_WIDTH, height: POPUP_HEIGHT });
		popupBG.setAttribute('position', { x: pos.x + 1.4, y: pos.y - 1.2, z: pos.z });

		var popupPN = document.querySelector('#popup-pn');
		popupPN.setAttribute('text', {text: info.pn, height: 0, size: 0.2});
		popupPN.setAttribute('position', pos);

		var popupTitle = document.querySelector('#popup-title');
		popupTitle.setAttribute('text', {text: info.title || 'Title test', height: 0, size: 0.16});
		popupTitle.setAttribute('position', Object.assign({}, pos, {y: pos.y - 0.25}));
		//var popupPN = document.querySelector('#popup-pn');
		//popupPN.setAttribute('innerHTML', info.pn);
        //
        //var popupEntity = document.querySelector('#popup-entity');
        //popupEntity.setAttribute('position', pos);
	}
	render() {
		var comp = this;

		var len = testData.length;
		var plans = testData.map(function (plan, idx) {
			var pos_z = (len - idx) * -6;
			return (
				<Plan expand={comp.state.allExpand} distanceLv={len - idx} posZ={pos_z} key={plan.year}
					  year={plan.year} list={plan.lists} updatePopup={comp.updatePopup} />
			);
		});

		const geometry = {
			primitive: 'plane',
			width: POPUP_WIDTH,
			height: POPUP_HEIGHT
		};
		const material = {
			color: '#AAAAAA',
			opacity: 0.2,
			transparent: true,
			side: 'double'
		};

		//<a-assets>
		//	<div id="popup">
		//		<div id="popup-pn" />
		//		<div id="popup-title" />
		//	</div>
		//</a-assets>
		//<a-entity id="popup-entity" geometry="primitive: plane" draw="width: 3; height: 3;" htmltexture="asset: #popup"></a-entity>
		return (
			<Scene>
				<Camera><Cursor/></Camera>
				<a-entity light="type: ambient; color: #999; intensity: 0.1"></a-entity>
				<a-entity light="type: directional; color: #EEE; intensity: 0.8" position="-1 1 0"></a-entity>
				<Sky/>

				{plans}
				<Entity id="popup-bg" geometry={geometry} material={material} position="-100 100 0"></Entity>
				<Entity id="popup-pn" text={`text: ''; height: 0; size: 0.2`} material={{}}></Entity>
				<Entity id="popup-title" text={`text: ''; height: 0; size: 0.2`} material={{}}></Entity>
			</Scene>
		);
		}

}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
