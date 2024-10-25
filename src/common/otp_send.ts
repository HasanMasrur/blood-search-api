
import axios from 'axios';

export class SmsService {
  private readonly apiUrl = 'http://bulksmsbd.net/api/smsapi';
  private readonly apiKey = 'HEp95N3o3uuj6DEw1GN0';
  private readonly senderId = '8809617612603';

  async sendSms(receiver: string, message: string): Promise<void> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          api_key: this.apiKey,
          type: 'text',
          number: receiver,
          senderid: this.senderId,
          message: message,
        },
      });

      console.log('SMS sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }
}
