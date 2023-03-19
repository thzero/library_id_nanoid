import { nanoid } from 'nanoid'

class IdGenerator {
	static _lengthLong = null;
	static _lengthShort = null;

	static generateId() {
		return IdGenerator.generateLongId();
	}

	static generateLongId() {
		if (IdGenerator._lengthLong)
			return nanoid(IdGenerator._lengthLong);
		return nanoid();
	}

	static generateShortId() {
		if (IdGenerator._lengthShort)
			return nanoid(IdGenerator._lengthShort);
		return nanoid();
	}

	static setLengthLong(length) {
		IdGenerator._lengthLong = length;
	}

	static setLengthShort(length) {
		IdGenerator._lengthShort = length;
	}

	static translateToShortId(id) {
		return id;
	}

	static translateToId(id) {
		return id;
	}
}

export default IdGenerator;
