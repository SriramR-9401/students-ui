import React from "react";
import { useForm } from "react-hook-form";
import AddEntry from "./Reducer/addEntry";
import { useDispatch } from "react-redux";

const Form = () => {
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	return (
		<form
			className="row g-3"
			onSubmit={handleSubmit((data) => dispatch(AddEntry(data)))}
		>
			<div className="col-md-6">
				<label htmlFor="validationCustom01" className="form-label">
					Name
				</label>
				<input
					type="text"
					className="form-control"
					id="validationCustom01"
					name="Name"
					{...register("name", { required: true })}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="validationCustom02" className="form-label">
					RollNo
				</label>
				<input
					type="number"
					className="form-control"
					id="validationCustom02"
					name="City"
					{...register("rollno", { required: true })}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="validationCustom" className="form-label">
					Marks
				</label>

				<input
					type="text"
					className="form-control"
					id="validationCustom"
					{...register("marks", { required: true })}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="validationCustom03" className="form-label">
					City
				</label>
				<input
					type="text"
					className="form-control"
					id="validationCustom03"
					{...register("city", { required: true })}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="validationCustom9" className="form-label">
					Age
				</label>

				<input
					type="text"
					className="form-control"
					id="validationCustom9"
					{...register("age", { required: true })}
				/>
			</div>
			<div className="col-12">
				<div className="form-check">
					<input className="form-check-input" type="checkbox" required />
					<label className="form-check-label" htmlFor="invalidCheck">
						Above Entered details are correct
					</label>
				</div>
			</div>
			<div className="col-12">
				<button className="btn btn-primary" type="submit">
					Submit Data
				</button>
			</div>
		</form>
	);
};

export default Form;
