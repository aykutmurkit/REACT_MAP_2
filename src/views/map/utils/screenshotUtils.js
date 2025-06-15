/**
 * Ekranda görünen tam harita alanının (butonlar dahil) ekran görüntüsünü alır
 * @returns {Promise<string>} - Kaydedilen dosyanın adı
 */
export const takeMapScreenshot = async () => {
  try {
    // MediaDevices API'sini kullanarak ekranı yakalama
    // Bu yöntem tarayıcı güvenlik kısıtlamaları nedeniyle kullanıcı izni gerektirebilir
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      throw new Error('Tarayıcınız ekran yakalama özelliğini desteklemiyor.');
    }

    // Kullanıcıdan ekranı paylaşma izni iste
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { 
        cursor: 'always',
        displaySurface: 'window'
      }
    });

    // Video akışından bir video elementi oluştur
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;

    // Video yüklendiğinde işlem yap
    await new Promise(resolve => {
      video.onloadedmetadata = () => {
        resolve();
      };
    });

    // Canvas oluştur ve video karesini çiz
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Video akışını durdur
    stream.getTracks().forEach(track => track.stop());

    // Timestamp oluştur
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `map-screenshot-${timestamp}.png`;

    // Canvas'ı PNG'ye dönüştür ve indir
    const imgData = canvas.toDataURL('image/png');
    
    // Veriyi Blob'a dönüştür
    const byteString = atob(imgData.split(',')[1]);
    const mimeString = imgData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], {type: mimeString});
    
    // URL.createObjectURL kullanarak daha güvenilir indirme
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = blobUrl;
    link.click();
    
    // URL'i temizle
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

    return fileName;
  } catch (error) {
    console.error('Screenshot alınamadı:', error);
    alert('Ekran görüntüsü alınamadı: ' + error.message);
    throw error;
  }
}; 