import React, { Component } from 'react';
import Department from "./components/Department";
import Cart from "./components/Cart";
import Modules from "./components/Modules";

class App extends Component {
  render() {
	//   console.log(this.getState());
    return (
		<div className="container-fluid">
			<div className="row quote-row show-grid">
				<div className="col-lg-9">
					<div className="department-wrapper col-lg-12">
						<div className="col-lg-12">
							<Department />
						</div>
					</div>
					<Modules />
				</div>
				<div className="col-lg-3">
					<Cart />
				</div>
			</div>
			
		</div>
    );
  }
}

export default App;
