import { memo, useEffect, useRef } from "react";
import { User } from "../types";
import { useVirtualizer } from "@tanstack/react-virtual";
import InfiniteScroll from "react-infinite-scroll-component";

type UsersListProps = {
  users: User[];
  hasNextPage: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
};

export const UsersList = memo((props: UsersListProps) => {
  const { users, hasNextPage, onLoadMore, isLoading } = props;
  console.log({ hasNextPage, users });

  // const parentRef = useRef<HTMLDivElement>(null);

  // const rowVirtualizer = useVirtualizer({
  //   count: hasNextPage ? users.length + 1 : users.length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 30,
  //   overscan: 5,
  // });

  // const getVirtualItemsFn = rowVirtualizer.getVirtualItems;
  // useEffect(() => {
  //   console.log("rerender", users, hasNextPage);

  //   const [lastItem, ...rest] = [...getVirtualItemsFn()].reverse();
  //   console.log({ lastItem, rest });

  //   if (!lastItem) {
  //     return;
  //   }

  //   if (lastItem.index >= users.length - 1 && hasNextPage && !isLoading) {
  //     onLoadMore();
  //   }
  // }, [hasNextPage, onLoadMore, users.length, isLoading, getVirtualItemsFn]);

  // return (
  //   <div
  //     ref={parentRef}
  //     className="List"
  //     style={{
  //       height: `500px`,
  //       width: `100%`,
  //       overflow: "auto",
  //     }}
  //   >
  //     <div
  //       style={{
  //         height: `${rowVirtualizer.getTotalSize()}px`,
  //         width: "100%",
  //         position: "relative",
  //       }}
  //     >
  //       {rowVirtualizer.getVirtualItems().map((virtualRow) => {
  //         const isLoaderRow = virtualRow.index > users.length - 1;
  //         const post = users[virtualRow.index];

  //         return (
  //           <div
  //             key={virtualRow.index}
  //             className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
  //             style={{
  //               position: "absolute",
  //               top: 0,
  //               left: 0,
  //               width: "100%",
  //               height: `${virtualRow.size}px`,
  //               transform: `translateY(${virtualRow.start}px)`,
  //             }}
  //           >
  //             {isLoaderRow
  //               ? hasNextPage
  //                 ? "Loading more..."
  //                 : "Nothing more to load"
  //               : post.login}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  return (
    <InfiniteScroll
      dataLength={users.length} //This is important field to render the next data
      next={onLoadMore}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      height={400}
    >
      {users.map((user) => (
        <div style={{ height: 60 }} key={user.login}>
          {user.login}
        </div>
      ))}
    </InfiniteScroll>
  );
});
