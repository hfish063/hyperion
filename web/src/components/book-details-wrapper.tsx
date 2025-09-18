export default function BookDetailsWrapper() {
  return <></>;
  // return (
  //   <div className="flex flex-col space-y-4">
  //     <div className="flex flex-row space-x-4">
  //       {/* <BookCoverImages coverIds={bookDetails.covers} /> */}
  //       <div className="flex flex-col space-y-4">
  //         <h1 className="text-2xl font-semibold">{bookDetails.title}</h1>
  //         <div>
  //           <Button>Track Progress</Button>
  //         </div>
  //       </div>
  //     </div>
  //     <hr />
  //     <p>
  //       <span className="font-semibold">Description: </span>
  //       {bookDetails.book
  //         ? bookDetails.book.description
  //         : "No description provided."}
  //     </p>
  //     <hr />
  //     <p>
  //       <span className="font-semibold">Original Publish Date: </span>
  //       {bookDetails.release_year
  //         ? bookDetails.release_year
  //         : "No publish date provided."}
  //     </p>
  //     <hr />
  //     <div className="flex flex-row space-x-2 items-center">
  //       <p className="font-semibold">Subjects: </p>
  //       <BookSubjectList subjects={bookDetails.subjects} />
  //     </div>
  //     <hr />
  //     <div className="flex flex-row space-x-2 items-center">
  //       <p className="font-semibold">Links: </p>
  //       <BookLinkList links={bookDetails.links} />
  //     </div>
  //   </div>
  // );
}

// type BookDetailsWrapperProps = {
//   bookDetails: BookMetadata;
// };
