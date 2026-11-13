export class AsyncRaceGuard {
	private currentSeq = 0
	private activeController: AbortController | null = null

	next(): { seq: number; signal: AbortSignal } {
		if (this.activeController) {
			this.activeController.abort()
		}
		this.currentSeq += 1
		this.activeController = new AbortController()
		return {
			seq: this.currentSeq,
			signal: this.activeController.signal
		}
	}

	isLatest(seq: number): boolean {
		return seq === this.currentSeq
	}
}

export class CommentSubmitLock {
	private locked = false

	acquire(): boolean {
		if (this.locked) return false
		this.locked = true
		return true
	}

	release(): void {
		this.locked = false
	}

	get isLocked(): boolean {
		return this.locked
	}
}
