import { nanoid, customAlphabet } from 'nanoid';

class IdGenerator {
	static _lengthLong = null;
	static _lengthShort = 16;
	static _generator = nanoid;

	static init(alphabet) {
		return customAlphabet(alphabet);
	}

	static generateId() {
		return IdGenerator.generateLongId();
	}

	static generateLongId() {
		if (IdGenerator._lengthLong)
			return IdGenerator._generator(IdGenerator._lengthLong);
		return IdGenerator._generator();
	}

	static generateShortId() {
		if (IdGenerator._lengthShort)
			return IdGenerator._generator(IdGenerator._lengthShort);
		return IdGenerator._generator();
	}

	static setAlphabet(alphabet) {
		if (!alphabet) {
			IdGenerator._generator = nanoid;
			return;
		}

		IdGenerator._generator = customAlphabet(alphabet);
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
