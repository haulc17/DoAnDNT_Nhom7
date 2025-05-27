// // components/RefreshableScrollView.js
// import React, { useState } from "react";
// import { ScrollView, RefreshControl } from "react-native";

// const RefreshableScrollView = ({ onRefresh, children, style }) => {
//   const [refreshing, setRefreshing] = useState(false);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await onRefresh();
//     } catch (error) {
//       console.error("Lỗi khi refresh:", error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={[{ flexGrow: 1 }, style]}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//       }
//     >
//       {children}
//     </ScrollView>
//   );
// };

// export default RefreshableScrollView;

// components/RefreshableScrollView.js
import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";

const RefreshableScrollView = ({
  onRefresh,
  children,
  style,
  onScroll, // ✅ thêm onScroll như prop tùy chọn
  scrollEventThrottle = 400, // ✅ thêm mặc định scrollEventThrottle
  showsVerticalScrollIndicator = true, // ✅ tùy chọn hiển thị thanh cuộn
  ...rest // ✅ nhận các props khác nếu có
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Lỗi khi refresh:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[{ flexGrow: 1 }, style]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onScroll={onScroll} // ✅ hỗ trợ scroll
      scrollEventThrottle={scrollEventThrottle} // ✅ kiểm soát tốc độ gọi scroll event
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...rest} // ✅ đảm bảo nhận các props như horizontal, keyboardDismissMode, v.v.
    >
      {children}
    </ScrollView>
  );
};

export default RefreshableScrollView;
