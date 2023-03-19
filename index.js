import { nanoid } from 'nanoid'

class IdUtility {
	static _lengthLong = null;
	static _lengthShort = null;

	static generateId() {
		return IdUtility.generateLongId();
	}

	static generateLongId() {
		if (IdUtility._lengthLong)
			return nanoid(IdUtility._lengthLong);
		return nanoid();
	}

	static generateShortId() {
		if (IdUtility._lengthShort)
			return nanoid(IdUtility._lengthShort);
		return nanoid();
	}

	static setLengthLong(length) {
		IdUtility._lengthLong = length;
	}

	static setLengthShort(length) {
		IdUtility._lengthShort = length;
	}
}

export default IdUtility;
