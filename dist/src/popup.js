	const defaultValue = {
			active: true
		}

		const btnActive = document.querySelector("#btnActive")
		function setActive(){
			btnActive.classList.add("active")
			btnActive.innerHTML = "활성화 됨"
			chrome.storage.sync.set({active:true})
		}

		function setinActive(){
			btnActive.classList.remove("active")
			btnActive.innerHTML = "비활성화 됨"
			chrome.storage.sync.set({active:false})
		}

		function toggleBtnActive(doActive){
			if(doActive === true)
				setActive()
			else 
				setinActive()
		}

		chrome.storage.sync.get("active",({active}) => {
			if(active === undefined) setActive()
		})

		chrome.storage.sync.get("active",({active}) => {
			toggleBtnActive(active)
		})

		btnActive.addEventListener("click",function(){
			toggleBtnActive(!btnActive.classList.contains("active"))
		})
