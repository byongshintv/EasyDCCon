
async function isBehaiveinActive(){
	return new Promise(res => {
		chrome.storage.sync.get("active",({active}) => {
			if(active === undefined) active = true 
			res(!active)
		})

	})
}

(async function(){
	// 글을 보고 있지 않은 경우 자동으로 나가기
	if( new URL(location).searchParams.get("no") === null ) return 
	if( await isBehaiveinActive()) return
	const _$ = document.querySelector.bind(document)
	new Promise(res => {
		_$(".dccon_guidebox").addEventListener("DOMSubtreeModified",() => res())
		_$(".tx_dccon").click()
	}).then(() => new Promise(res => {
		_$(".dccon_guidebox").addEventListener("DOMSubtreeModified",() => res())
		_$(".icon_dccon_recent").click()
	})).then(() => new Promise(res => {
		var _$dcconlist = _$(".dccon_list.recent").cloneNode(true)
	    var dcconsize = "40px"
	    _$dcconlist.style.position = "fixed";
	    _$dcconlist.style.bottom = 0;
	    _$dcconlist.style.left = 0;
	    _$dcconlist.style.width = parseInt(dcconsize.replace("px","")) * 2.5 + "px";

	    [..._$dcconlist.querySelectorAll("button")].forEach(_$btn => {
			_$btn.style.width = dcconsize
			_$btn.style.height = dcconsize
			const _$img = _$btn.querySelector("img")
			_$img.style.width = dcconsize
			_$img.style.height = dcconsize
			
		})

	    document.body.appendChild( _$dcconlist )
		_$(".tx_dccon").click()
	})).then(v =>_$(".tx_dccon").click() ).catch(v => console.log(v))

})()