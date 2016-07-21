import 'aframe';
import 'aframe-video-shader'
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';
import Plan from './components/YearPlan';

const testData =  require('./test_data.json');



class BoilerplateScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: 'red'
		}
	}

	changeColor = () => {
		const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
		this.setState({
			color: colors[Math.floor(Math.random() * colors.length)],
		});
	};


	render() {
		var comp = this;

		var plans = testData.map(function (plan, idx) {
			return (
				<Plan distanceLv={idx} key={plan.year} year={plan.year} list={plan.lists}/>
			);
		});

			return (
				<Scene>
					<Camera><Cursor/></Camera>
					<a-entity light="type: ambient; color: #999; intensity: 0.1"></a-entity>
					<a-entity light="type: directional; color: #EEE; intensity: 0.8" position="-1 1 0"></a-entity>
					<Sky/>

					{plans}
				</Scene>
			);
		}

}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
