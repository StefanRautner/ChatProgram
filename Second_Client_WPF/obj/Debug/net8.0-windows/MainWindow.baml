   M S B A M L   `   `   `  ����L  HSecond_Client_WPF, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:Second_Client_WPFSecond_Client_WPF  5   	   "    Second_Client_WPF.MainWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   1localclr-namespace:Second_Client_WPF     5   	     � Title$  ChatProgram��5	   	   $��437px��6   $��514px��6,    � Icon$ 	/icon.png��6:    � 
ResizeMode$ NoResize=�6K   .��5
      �  � ColumnDefinitions 5   
   �� 5      $��100px �6   �� 5      $��400px �6    � RowDefinitions 5   
   �� 5      $��350px �6   �� 5      $
��50px �6   .+�5   
   �� -   5         ��Name$ 	ChatField��5      $��1��6|   $
��Left=�6�   $	��Top=�6�   $	��400��6�   $	��350��6�    �� View 5      �� 5      .P�5      �� $��Nachrichten��6%    �� DisplayMemberBinding 6:   �� *	message+5      5      �� 5   
   -   5         ��Name$ MessageField��5      $��1��6(   $��1��68   $
��Left=�6E   	 �� TextWrapping$
	 Wrap=�6`   $��Center=�6t   $��50��6�   $	��300��6�   6�   �� 5   
   -   5        $��1��5      $��1��6!   $��Senden��6.   $
��Left=�6?   $��	300,0,0,0q�6Z   $	��100��6m   6y   �� 5   
   -   5        $ 	ShowChats��5      $��Center=�6&   $	��Top=�6C   $��0��6�   $	��100��6�    5      �� 5      .P�5      �� $��Chats��6%    64   �� *
chatName+5       5"      �� 5#   
   -   5        $��Chat aktualisieren��5#      $��Center=�6J   $	��Top=�6g   $	��100��6   $��58��6�   $��1��6�   �� 5$   
   .+�5%      �� -   5        $��Nachricht updaten��5%   1   $	��131��6M   $��23��6Y   
 �� Left$	
 369��6e   
 �� Top$ 2��6w   $��Center=�6�   $	��Top=�6�   5&      5'      5(      