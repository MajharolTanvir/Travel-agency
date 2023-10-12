-- AddForeignKey
ALTER TABLE "RoomFacilities" ADD CONSTRAINT "RoomFacilities_FacilitiesOptionsId_fkey" FOREIGN KEY ("FacilitiesOptionsId") REFERENCES "FacilitiesOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
