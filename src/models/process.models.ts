import mongoose, { Schema, Document } from 'mongoose';

export interface IProcess extends Document {
	pid: number;
	creation_time: string;
	logs: string[];
}

const ProcessSchema: Schema = new Schema({
	pid: { type: Number, required: true },
	creation_time: { type: String, required: true },
	logs: { type: [String], required: true },
});

const ProcessModel = mongoose.model<IProcess>('process', ProcessSchema);

export default ProcessModel;

