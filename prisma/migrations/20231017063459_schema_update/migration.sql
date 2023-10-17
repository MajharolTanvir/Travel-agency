-- AddForeignKey
ALTER TABLE "BookedHotel" ADD CONSTRAINT "BookedHotel_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
