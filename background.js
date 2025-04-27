function playSound() {
	chrome.storage.local.get(['enableSound'], (result) => {
		const enable = result.enableSound ?? true;

		if (!result) return;
		chrome.offscreen.hasDocument().then((has) => {
			if (!has) {
				chrome.offscreen.createDocument({
					//url: chrome.runtime.getURL('assets/tada.mp3'),		//따단~
					url: chrome.runtime.getURL('assets/riff.mp3'),			//ACDC 기타리프
					reasons: ['AUDIO_PLAYBACK'],
					justification: 'Playing audio on the user’s request',
				});
			}
		});
	});
}

function sendDiscordAlert() {
	chrome.storage.local.get(['enableDiscordAlert'], (result) => {

		const enable = result.enableDiscordAlert ?? true;
    	if (!enable) return;

		const webhookUrl = "https://discord.com/api/webhooks/1353387679286427760/R2390nU1oTKsqbtJGBGoNn4LKiflGmTN3sA2_H7qWVsKIcNcbDaMDyYac6uJEYxBrWtt";
		const message = {
			content: "🎫 예매 완료! 매크로가 티켓을 잡았습니다!"
		};

		fetch(webhookUrl, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(message)
		});
	});
}

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
    if (message && message.type == 'playSound') {
		playSound();
        sendResponse(true);
		return true;
    }
	if (message.type === "DISCORD_ALERT") {
		sendDiscordAlert();
		sendResponse({ ok: true });
	}
});

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	  id: "open-discord-server",
	  title: "📬 디스코드 서버 접속하기",
	  contexts: ["action"]
	});
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "open-discord-server") {
	  chrome.tabs.create({ url: "https://discord.gg/fEGePtqHbv" });
	}
  });
