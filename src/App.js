import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Getdata from "./Reducer/Getdata";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import Form from "./Form";
import AddEntry from "./Reducer/addEntry";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { update: false, id: 0 };
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEntry = this.handleEntry.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	componentDidMount() {
		axios
			.get("http://localhost:7000/display")
			.then((res) => this.props.getdetails(res.data))
			.catch((err) => console.log(err));
	}
	handleDelete(item) {
		axios
			.delete(`http://localhost:7000/deleteEntry/${item}`)
			.then((res) => this.componentDidMount())
			.catch((err) => console.log(err));
	}
	handleEntry() {
		axios({
			method: "post",
			url: "http://localhost:7000/addEntry",
			data: this.props.New,
		})
			.then((res) => {
				this.componentDidMount();
				this.props.clearData({});
			})
			.catch((err) => console.log(err));
	}
	handleUpdate() {
		axios({
			method: "patch",
			url: `http://localhost:7000/updateEntry/${this.state.id}`,
			data: this.props.New,
		})
			.then((res) => this.componentDidMount())
			.catch((err) => console.log(err));
		this.setState({ update: false, id: 0 });
	}
	render() {
		return (
			<React.Fragment>
				<h4 className="text-center pt-2">A Student database Api with React</h4>
				<div className="container-md">
					<Button
						className="m-3"
						variant="contained"
						color="primary"
						onClick={() => this.componentDidMount()}
					>
						Refresh Details
					</Button>
					<button
						className="btn btn-success m-3"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					>
						Add Entry
					</button>
					<div>
						<table className="table table-bordered table-hover table-success">
							<thead>
								<tr>
									<th>RollNo</th>
									<th>Name</th>
									<th>Age</th>
									<th>City</th>
									<th>Marks</th>
									<th>Last Updated at</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.props.Student
									? this.props.Student.map((item) => (
											<tr key={item._id}>
												<td>{item.RollNo}</td>
												<td>{item.Name}</td>
												<td>{item.Age}</td>
												<td>{item.City}</td>
												<td>{item.Marks}</td>
												<td>{item.DateofJoin}</td>
												<td>
													<IconButton
														onClick={() =>
															this.setState({ update: true, id: item.RollNo })
														}
														type="button"
														data-bs-toggle="modal"
														data-bs-target="#exampleModal"
													>
														<EditIcon />
													</IconButton>

													<IconButton
														onClick={() => this.handleDelete(item.RollNo)}
													>
														<DeleteIcon color="secondary" />
													</IconButton>
												</td>
											</tr>
									  ))
									: {}}
							</tbody>
						</table>
					</div>
				</div>
				<div
					className="modal fade"
					id="exampleModal"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									New Student details
								</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<Form />
							</div>
							<div className="modal-footer ">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-success"
									data-bs-dismiss="modal"
									onClick={
										this.state.update
											? () => this.handleUpdate()
											: () => this.handleEntry()
									}
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state) => {
	return state;
};
const mapDispatchToProps = (dispatch) => {
	return {
		getdetails: (data) => {
			dispatch(Getdata(data));
		},
		clearData: (data) => {
			dispatch(AddEntry(data));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
