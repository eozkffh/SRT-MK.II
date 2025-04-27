const defaultWebhookUrl = "https://discord.com/api/webhooks/1353387679286427760/R2390nU1oTKsqbtJGBGoNn4LKiflGmTN3sA2_H7qWVsKIcNcbDaMDyYac6uJEYxBrWtt";


//사용자 웹훅 사용 시 저장 및 테스트메시지 기능. 현재 사용 X
// function save_options() {
// 	const webhookUrl = document.getElementById('webhook_url').value.trim();
// 	chrome.storage.local.set({ discordWebhookUrl: webhookUrl }, () => {
// 		const status = document.getElementById('status');
// 		status.textContent = '✅ Webhook URL 저장 완료!';
// 		setTimeout(() => status.textContent = '', 1000);
// 	});
// }
// function restore_options() {
// 	chrome.storage.local.get(["discordWebhookUrl"], (result) => {
// 		const savedUrl = result.discordWebhookUrl || defaultWebhookUrl;
// 		document.getElementById('webhook_url').value = savedUrl;
// 	});
// }

// function sendTestMessage() {
//   const url = document.getElementById('webhook_url').value.trim() || defaultWebhookUrl;

//   fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ content: "✅ 디스코드 웹훅 연결 테스트 성공!" })
//   })
//   .then(response => {
//     if (response.ok) {
//       alert("🎉 테스트 메시지를 디스코드에 보냈어요!");
//     } else {
//       response.text().then(text => {
//         alert("❌ 실패: " + text);
//         console.error(text);
//       });
//     }
//   })
//   .catch(error => {
//     console.error("❌ fetch 오류:", error);
//     alert("🚨 오류 발생: 콘솔을 확인해주세요.");
//   });
// }



// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click', save_options);
// document.getElementById('test').addEventListener('click', sendTestMessage);

console.log("✅ options.js 실행됨");

document.addEventListener('DOMContentLoaded', () => {
  console.log("🌱 DOM fully loaded");

  restore_options();

  const saveBtn = document.getElementById('save');
  if (saveBtn) {
    console.log("💾 저장 버튼 이벤트 연결");
    saveBtn.addEventListener('click', save_options);
  } else {
    console.log("❌ 저장 버튼 못 찾음");
  }
});

function save_options() {
  chrome.storage.local.set({
    enableDiscordAlert: document.getElementById('enableDiscordAlert').checked,
    enableSound: document.getElementById('enableSound').checked
  }, () => {
    document.getElementById('status').textContent = '✅ 설정이 저장되었습니다.';
    setTimeout(() => document.getElementById('status').textContent = '', 1000);
  });
}

function restore_options() {
  chrome.storage.local.get(['enableDiscordAlert', 'enableSound'], (result) => {
    document.getElementById('enableDiscordAlert').checked =
      result.enableDiscordAlert !== undefined ? result.enableDiscordAlert : true;

    document.getElementById('enableSound').checked =
      result.enableSound !== undefined ? result.enableSound : true;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

