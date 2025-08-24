import axios from 'axios';

export async function sendAlert(webhookUrl, payload) {
  if (!webhookUrl) return;
  try {
    await axios.post(webhookUrl, payload);
  } catch (err) {
    console.error('Failed to send alert', err.message);
  }
}
