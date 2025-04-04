import Modal from "@/components/Modal";

import prisma from "@/lib/db";

const DetailsInterceptedPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const eventData = await prisma.event.findUnique({
    where: { id },
  });

  if (!eventData) {
    return <h1>No Event and event details to display</h1>;
  }

  return (
    <Modal>
      <div>{eventData.description}</div>
    </Modal>
  );
};
export default DetailsInterceptedPage;
