const { kafka } = require('./client');

export async function kProducer(
  description: string,
  title: string,
  todoId: string
) {
  const producer = kafka.producer();

  console.log('Connecting producer');
  await producer.connect();
  console.log('Producer connected success');

  const result = await producer.send({
    topic: 'Todo-Created',
    messages: [
      {
        partition: 0,
        key: 'Todo',
        value: JSON.stringify({
          title: title,
          description: description,
          todoId: todoId,
        }),
      },
    ],
  });

  console.log(result,'😁😁kafka result here😁😁');
  
  console.log('Producer disconnecting...');
  producer.disconnect();
}
