import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post', content: 'First Post Content'},
  //   {title: 'Second Post', content: 'Second Post Content'},
  //   {title: 'Third Post', content: 'Third Post Content'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;


  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.postsService.getPosts();
    this.postsSub= this.postsService.getPostUpdateListener().
    subscribe((posts: Post[]) => {
      this.posts=posts;
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
